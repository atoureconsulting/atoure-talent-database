import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Toolbar from './components/Toolbar.jsx';
import StatsBar from './components/StatsBar.jsx';
import ContactTable from './components/ContactTable.jsx';
import ContactDrawer from './components/ContactDrawer.jsx';
import ContactModal from './components/ContactModal.jsx';
import Toast from './components/Toast.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import {
  getContacts, getStats, getActivity, addActivity,
  updateContact, deleteContact, bulkStatus, importContacts, exportCSVUrl,
  getToken, setToken,
} from './api.js';

const ALL_COLUMNS = ['name', 'sector', 'phone', 'score', 'priority', 'status', 'followUpDate', 'actions'];

function loadVisibleColumns() {
  try {
    const stored = localStorage.getItem('atoure_columns');
    if (stored) {
      const arr = JSON.parse(stored);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
  } catch {}
  return ALL_COLUMNS;
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => !!getToken());

  useEffect(() => {
    function handleUnauthorized() { setAuthenticated(false); }
    window.addEventListener('atoure:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('atoure:unauthorized', handleUnauthorized);
  }, []);

  if (!authenticated) {
    return <LoginScreen onAuthenticated={() => setAuthenticated(true)} />;
  }

  return <AuthenticatedApp onLogout={() => { setToken(null); setAuthenticated(false); }} />;
}

function AuthenticatedApp({ onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ sector: '', status: '', priority: '' });
  const [sort, setSort] = useState({ field: 'combinedScore', dir: 'desc' });
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [visibleColumns, setVisibleColumns] = useState(loadVisibleColumns);
  const [drawerContact, setDrawerContact] = useState(null);
  const [drawerActivity, setDrawerActivity] = useState([]);
  const [modalMode, setModalMode] = useState(null);
  const [modalContact, setModalContact] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [stats, setStats] = useState({ total: 0, byStatus: {}, byPriority: {}, bySector: {} });
  const fetchTimeoutRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getContacts({
        search,
        sector: filters.sector,
        status: filters.status,
        priority: filters.priority,
        sort: sort.field,
        dir: sort.dir,
        page,
        pageSize,
      });
      setContacts(result.contacts);
      setTotal(result.total);
    } catch (e) {
      showToast('Failed to load contacts', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, filters, sort, page, pageSize, showToast]);

  const fetchStats = useCallback(async () => {
    try {
      const s = await getStats();
      setStats(s);
    } catch {}
  }, []);

  useEffect(() => {
    if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(() => {
      fetchContacts();
    }, 120);
    return () => clearTimeout(fetchTimeoutRef.current);
  }, [fetchContacts]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Re-fetch stats when contacts change
  useEffect(() => {
    fetchStats();
  }, [contacts.length]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(f => ({ ...f, [key]: f[key] === value ? '' : value }));
    setPage(1);
    setSelectedIds(new Set());
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({ sector: '', status: '', priority: '' });
    setPage(1);
    setSelectedIds(new Set());
  }, []);

  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    setPage(1);
    setSelectedIds(new Set());
  }, []);

  const handleSortChange = useCallback((field, dir) => {
    setSort({ field, dir });
    setPage(1);
  }, []);

  const handlePageChange = useCallback((p) => {
    setPage(p);
    setSelectedIds(new Set());
  }, []);

  const handleToggleColumn = useCallback((col) => {
    setVisibleColumns(cols => {
      const next = cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col];
      localStorage.setItem('atoure_columns', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleRowClick = useCallback(async (contact) => {
    setDrawerContact(contact);
    try {
      const activity = await getActivity(contact.id);
      setDrawerActivity(activity);
    } catch {
      setDrawerActivity([]);
    }
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerContact(null);
    setDrawerActivity([]);
  }, []);

  const handleDrawerUpdate = useCallback(async (id, data) => {
    try {
      const updated = await updateContact(id, data);
      setContacts(cs => cs.map(c => c.id === id ? { ...c, ...updated } : c));
      setDrawerContact(dc => dc && dc.id === id ? { ...dc, ...updated } : dc);
      if (data.followUpDate !== undefined) {
        const activity = await getActivity(id);
        setDrawerActivity(activity);
      }
      return updated;
    } catch (e) {
      showToast('Update failed', 'error');
      throw e;
    }
  }, [showToast]);

  const handleDrawerAddActivity = useCallback(async (contactId, action, detail) => {
    try {
      await addActivity(contactId, action, detail);
      const activity = await getActivity(contactId);
      setDrawerActivity(activity);
    } catch {
      showToast('Failed to log note', 'error');
    }
  }, [showToast]);

  const handleStatusCycle = useCallback(async (contact) => {
    const order = ['New', 'Contacted', 'Partner', 'Archived'];
    const idx = order.indexOf(contact.status);
    const nextStatus = order[(idx + 1) % order.length];
    try {
      const updated = await updateContact(contact.id, { status: nextStatus });
      setContacts(cs => cs.map(c => c.id === contact.id ? { ...c, ...updated } : c));
      setDrawerContact(dc => dc && dc.id === contact.id ? { ...dc, ...updated } : dc);
      fetchStats();
    } catch {
      showToast('Failed to update status', 'error');
    }
  }, [showToast, fetchStats]);

  const handleDelete = useCallback(async (id) => {
    if (!confirm('Delete this contact?')) return;
    try {
      await deleteContact(id);
      setContacts(cs => cs.filter(c => c.id !== id));
      setTotal(t => t - 1);
      if (drawerContact && drawerContact.id === id) handleDrawerClose();
      showToast('Contact deleted');
      fetchStats();
    } catch {
      showToast('Delete failed', 'error');
    }
  }, [drawerContact, handleDrawerClose, showToast, fetchStats]);

  const handleEdit = useCallback((contact) => {
    setModalContact(contact);
    setModalMode('edit');
  }, []);

  const handleAddContact = useCallback(() => {
    setModalContact(null);
    setModalMode('add');
  }, []);

  const handleModalClose = useCallback(() => {
    setModalMode(null);
    setModalContact(null);
  }, []);

  const handleModalSave = useCallback(async () => {
    await fetchContacts();
    fetchStats();
    handleModalClose();
    showToast('Contact saved');
  }, [fetchContacts, fetchStats, handleModalClose, showToast]);

  const handleBulkStatus = useCallback(async (status) => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    try {
      await bulkStatus(ids, status);
      setSelectedIds(new Set());
      await fetchContacts();
      fetchStats();
      showToast(`${ids.length} contacts updated to ${status}`);
    } catch {
      showToast('Bulk update failed', 'error');
    }
  }, [selectedIds, fetchContacts, fetchStats, showToast]);

  const handleImport = useCallback(async (file) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error('Expected array');
      const result = await importContacts(data);
      await fetchContacts();
      fetchStats();
      showToast(`${result.imported} contacts imported${result.skipped ? `, ${result.skipped} skipped` : ''}`);
    } catch (e) {
      showToast('Import failed: ' + e.message, 'error');
    }
  }, [fetchContacts, fetchStats, showToast]);

  const handleExport = useCallback(() => {
    const url = exportCSVUrl({
      search,
      sector: filters.sector,
      status: filters.status,
      priority: filters.priority,
      sort: sort.field,
      dir: sort.dir,
    });
    const a = document.createElement('a');
    a.href = url;
    a.click();
  }, [search, filters, sort]);

  const handleSelectAll = useCallback((checked) => {
    if (checked) {
      setSelectedIds(new Set(contacts.map(c => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  }, [contacts]);

  const handleToggleSelect = useCallback((id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="app-layout">
      <div className="app-header">
        <Header
          onAddContact={handleAddContact}
          onImport={handleImport}
          onExport={handleExport}
          onLogout={onLogout}
        />
      </div>

      <div className="app-sidebar">
        <Sidebar
          stats={stats}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      <main className="app-main">
        <Toolbar
          search={search}
          onSearchChange={handleSearchChange}
          sort={sort}
          onSortChange={handleSortChange}
          visibleColumns={visibleColumns}
          allColumns={ALL_COLUMNS}
          onToggleColumn={handleToggleColumn}
          total={total}
        />
        <StatsBar stats={stats} contacts={contacts} />

        {selectedIds.size > 0 && (
          <div className="bulk-bar">
            <span className="bulk-count">{selectedIds.size} selected</span>
            <span className="bulk-label">Change Status:</span>
            {['New', 'Contacted', 'Partner', 'Archived'].map(s => (
              <button key={s} className="bulk-status-btn" onClick={() => handleBulkStatus(s)}>
                {s}
              </button>
            ))}
            <button className="bulk-clear-btn" onClick={() => setSelectedIds(new Set())}>
              Clear
            </button>
          </div>
        )}

        <ContactTable
          contacts={contacts}
          total={total}
          loading={loading}
          page={page}
          pageSize={pageSize}
          visibleColumns={visibleColumns}
          selectedIds={selectedIds}
          onRowClick={handleRowClick}
          onSelectAll={handleSelectAll}
          onToggleSelect={handleToggleSelect}
          onStatusCycle={handleStatusCycle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
        />
      </main>

      {drawerContact && (
        <ContactDrawer
          contact={drawerContact}
          activity={drawerActivity}
          onClose={handleDrawerClose}
          onUpdate={handleDrawerUpdate}
          onAddActivity={handleDrawerAddActivity}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showToast={showToast}
        />
      )}

      {modalMode && (
        <ContactModal
          mode={modalMode}
          contact={modalContact}
          onClose={handleModalClose}
          onSave={handleModalSave}
          showToast={showToast}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
