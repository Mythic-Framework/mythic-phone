import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppView, useAppButton, useMyApps, useAppColor, hexAlpha } from '../../hooks';
import { RootState, AppDispatch } from '../../store';
import Nui from '../../util/Nui';

const IS_DEV = import.meta.env.DEV;
const APPS_PER_PAGE = 24;
const APPS_PER_FOLDER_PAGE = 9;
const DRAG_THRESHOLD = 8;   // px moved before drag starts
const MERGE_DELAY = 600;    // ms hover before reorder (quick = merge)

const CELL = 64;
const GAP  = 8;
const PAD  = 20;
const GRID_W = CELL * 3 + GAP * 2;
const CARD_W = GRID_W + PAD * 2;

// ── Folder overlay ────────────────────────────────────────────────────────────
interface FolderOverlayProps {
  folder: { id: string; name: string; apps: string[] };
  apps: Record<string, any>;
  onClose: () => void;
  onOpen: (app: string) => void;
  onDropIn: (app: string) => void;
  onDropOut: (app: string) => void;
  teal: string; teal50: string; teal20: string;
}

const FolderOverlay: React.FC<FolderOverlayProps> = ({ folder, apps, onClose, onOpen, onDropIn, onDropOut, teal: TEAL, teal50: TEAL_50, teal20: TEAL_20 }) => {
  const [innerPage, setInnerPage] = useState(0);
  const swipeRef = useRef<number | null>(null);
  const swiping = useRef(false);
  const totalPages = Math.ceil(folder.apps.length / APPS_PER_FOLDER_PAGE) || 1;
  useEffect(() => { setInnerPage(0); }, [folder.id]);

  return (
    <div
      style={{ position: 'absolute', inset: 0, zIndex: 99, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}
      onClick={onClose}
    >
      <div
        data-folder-card="1"
        style={{ width: CARD_W, background: 'rgba(50,50,55,0.96)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: PAD, boxSizing: 'border-box', boxShadow: '0 4px 32px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
        onPointerDown={e => { swipeRef.current = e.clientX; swiping.current = false; }}
        onPointerMove={e => { if (swipeRef.current !== null && Math.abs(e.clientX - swipeRef.current) > 8) swiping.current = true; }}
        onPointerUp={e => {
          if (swipeRef.current === null) return;
          const dx = e.clientX - swipeRef.current;
          if (swiping.current && Math.abs(dx) > 30) {
            if (dx < 0 && innerPage < totalPages - 1) setInnerPage(p => p + 1);
            if (dx > 0 && innerPage > 0) setInnerPage(p => p - 1);
          }
          swipeRef.current = null; swiping.current = false;
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: PAD, fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', color: '#fff' }}>
          {folder.name}
        </div>
        <div style={{ width: GRID_W, overflow: 'hidden' }}>
          <div style={{ display: 'flex', width: totalPages * GRID_W + GAP * (totalPages - 1), transform: `translateX(-${innerPage * (GRID_W + GAP)}px)`, transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)', gap: GAP }}>
            {Array.from({ length: totalPages }).map((_, pg) => {
              const pgApps = folder.apps.slice(pg * APPS_PER_FOLDER_PAGE, (pg + 1) * APPS_PER_FOLDER_PAGE);
              const slots: (string | null)[] = [...pgApps, ...Array(APPS_PER_FOLDER_PAGE - pgApps.length).fill(null)];
              return (
                <div key={pg} style={{ width: GRID_W, flexShrink: 0, display: 'grid', gridTemplateColumns: `repeat(3, ${CELL}px)`, gridAutoRows: CELL, gap: GAP }}>
                  {slots.map((appKey, idx) => {
                    if (!appKey) return <div key={`e-${idx}`} style={{ width: CELL, height: CELL, visibility: 'hidden' }} />;
                    const data = apps[appKey];
                    if (!data) return <div key={appKey} style={{ width: CELL, height: CELL, visibility: 'hidden' }} />;
                    return (
                      <div
                        key={appKey}
                        data-folder-app={appKey}
                        onMouseDown={e => {
                          if (e.button !== 0) return;
                          e.stopPropagation();
                          const startX = e.clientX; const startY = e.clientY;
                          let dragging = false;
                          let ghost: HTMLDivElement | null = null;
                          const onMove = (me: MouseEvent) => {
                            const dx = me.clientX - startX; const dy = me.clientY - startY;
                            if (!dragging && Math.sqrt(dx*dx+dy*dy) > 8) {
                              dragging = true;
                              ghost = document.createElement('div');
                              ghost.style.cssText = `position:fixed;left:${me.clientX-28}px;top:${me.clientY-28}px;width:56px;height:56px;border-radius:14px;background:${data.color};pointer-events:none;z-index:99999;opacity:0.85;transform:scale(1.15);box-shadow:0 8px 24px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;color:#fff;`;
                              // Clone the icon SVG from the actual item in the DOM
                              const itemEl = document.querySelector(`[data-folder-app="${appKey}"]`) as HTMLElement | null;
                              const svg = itemEl?.querySelector('svg');
                              if (svg) {
                                const clone = svg.cloneNode(true) as SVGElement;
                                clone.setAttribute('width', '24'); clone.setAttribute('height', '24');
                                clone.style.pointerEvents = 'none';
                                ghost.appendChild(clone);
                              }
                              document.body.appendChild(ghost);
                            }
                            if (ghost) { ghost.style.left = `${me.clientX-28}px`; ghost.style.top = `${me.clientY-28}px`; }
                          };
                          const onUp = (me: MouseEvent) => {
                            window.removeEventListener('mousemove', onMove);
                            window.removeEventListener('mouseup', onUp);
                            if (ghost) { ghost.remove(); ghost = null; }
                            if (!dragging) { if (!swiping.current) onOpen(appKey); return; }
                            // Check if dropped outside the folder card
                            const el = document.elementFromPoint(me.clientX, me.clientY) as HTMLElement | null;
                            const insideCard = el?.closest('[data-folder-card]');
                            if (!insideCard) onDropOut(appKey);
                          };
                          window.addEventListener('mousemove', onMove);
                          window.addEventListener('mouseup', onUp);
                        }}
                        style={{ width: CELL, height: CELL, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'grab', borderRadius: 10, boxSizing: 'border-box' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: data.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
                          <FontAwesomeIcon icon={data.icon} />
                        </div>
                        <div style={{ width: CELL - 4, fontSize: 14, lineHeight: '11px', height: 11, color: 'rgba(255,255,255,0.85)', fontFamily: 'sans-serif', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {data.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, marginTop: 10 }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <div key={i} onClick={e => { e.stopPropagation(); setInnerPage(i); }}
                style={{ width: innerPage === i ? 14 : 5, height: 5, borderRadius: 3, background: innerPage === i ? TEAL : 'rgba(255,255,255,0.3)', transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer' }} />
            ))}
          </div>
        )}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', pointerEvents: 'none' }}>
        {totalPages > 1 ? 'Swipe for more' : 'Tap to open'}
      </div>
    </div>
  );
};

// ── Context menu ──────────────────────────────────────────────────────────────
interface CtxMenuProps {
  app: string; appLabel: string; position: { x: number; y: number };
  isHome: boolean; isDocked: boolean; isDockFull: boolean;
  onClose: () => void; onAddHome: () => void; onRemoveHome: () => void;
  onDock: () => void; onUndock: () => void; onOpen: () => void; onCreateFolder: () => void;
  teal: string; teal50: string; teal20: string;
}

const CtxMenu: React.FC<CtxMenuProps> = ({ appLabel, position, isHome, isDocked, isDockFull, onClose, onAddHome, onRemoveHome, onDock, onUndock, onOpen, onCreateFolder, teal: TEAL, teal50: TEAL_50, teal20: TEAL_20 }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const item = (label: string, onClick: () => void, danger = false, disabled = false) => (
    <div
      onClick={() => { if (!disabled) { onClick(); onClose(); } }}
      style={{ padding: '9px 14px', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.05em', color: disabled ? 'rgba(255,255,255,0.2)' : danger ? '#e05a5a' : '#fff', cursor: disabled ? 'not-allowed' : 'pointer', transition: 'background 0.12s', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = danger ? 'rgba(224,90,90,0.1)' : TEAL_20; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      {label}
    </div>
  );

  return (
    <Menu
      keepMounted
      open
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{ left: position.x, top: position.y }}
      PaperProps={{
        style: {
          background: 'transparent',
          boxShadow: 'none',
          overflow: 'visible',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
        }
      }}
    >
      <div ref={ref} style={{ minWidth: 180, backgroundColor: 'rgb(8,10,14)', backgroundImage: `linear-gradient(135deg, ${TEAL_20} 0%, rgba(8,10,14,0.98) 100%)`, border: `1px solid ${TEAL_50}`, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.7)', overflow: 'hidden' }}>
        <div style={{ padding: '8px 14px 6px', fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEAL, borderBottom: `1px solid ${TEAL_50}` }}>{appLabel}</div>
        {item('Open', onOpen)}
        {isDocked ? item('Remove from Dock', onUndock) : item('Add to Dock', onDock, false, isDockFull)}
        {isHome ? item('Remove from Home', onRemoveHome) : item('Add to Home', onAddHome)}
        {item('Create Folder', onCreateFolder)}
      </div>
    </Menu>
  );
};

// ── Folder icon ───────────────────────────────────────────────────────────────
interface FolderIconProps {
  folder: { id: string; name: string; apps: string[] };
  apps: Record<string, any>;
  onOpen: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  isDragTarget: boolean;
  isBeingDragged: boolean;
  teal: string; teal20: string;
}

const FolderIcon: React.FC<FolderIconProps> = ({ folder, apps, onOpen, onMouseDown, onContextMenu, isDragTarget, isBeingDragged, teal: TEAL, teal20: TEAL_20 }) => {
  const [hov, setHov] = useState(false);
  const preview = folder.apps.slice(0, 4);
  return (
    <div
      data-folder-id={folder.id}
      onMouseDown={onMouseDown}
      onClick={onOpen}
      onContextMenu={onContextMenu}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '25%', display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
        padding: '8px 4px', borderRadius: 14, cursor: 'grab', boxSizing: 'border-box',
        background: isDragTarget ? TEAL_20 : hov ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: isDragTarget ? `2px solid ${TEAL}` : '2px solid transparent',
        opacity: isBeingDragged ? 0.35 : 1,
        transition: 'background 0.15s, border 0.15s, opacity 0.15s, transform 0.15s',
        transform: isDragTarget ? 'scale(1.08)' : hov ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      <div style={{ width: '3.4rem', height: '3.4rem', borderRadius: '1rem', background: isDragTarget ? 'rgba(32,134,146,0.35)' : 'rgba(255,255,255,0.18)', display: 'grid', gridTemplateColumns: '1fr 1fr', padding: 6, gap: 4, boxShadow: '0 3px 12px rgba(0,0,0,0.45)', transition: 'background 0.15s' }}>
        {preview.map(appKey => {
          const data = apps[appKey];
          if (!data) return <div key={appKey} />;
          return <div key={appKey} style={{ borderRadius: 5, background: data.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff' }}><FontAwesomeIcon icon={data.icon} /></div>;
        })}
        {Array.from({ length: Math.max(0, 4 - preview.length) }).map((_, i) => (
          <div key={`e-${i}`} style={{ borderRadius: 5, background: 'rgba(255,255,255,0.1)' }} />
        ))}
      </div>
      <div style={{ fontSize: 14, color: isDragTarget ? TEAL : hov ? '#fff' : 'rgba(255,255,255,0.8)', marginTop: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90%', fontFamily: "'Oswald', sans-serif", fontWeight: 400, letterSpacing: '0.04em', textAlign: 'center', transition: 'color 0.15s' }}>
        {folder.name}
      </div>
    </div>
  );
};

// ── Main Home ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const openedApp = useAppView();
  const showAlert = useAlert();
  const appButton = useAppButton();
  const apps = useMyApps();

  const TEAL = useAppColor('home');
  const TEAL_50 = hexAlpha(TEAL, 0.5);
  const TEAL_20 = hexAlpha(TEAL, 0.2);

  const player = useSelector((state: RootState) => (state.data.data as any).player);
  const homeApps: string[] = useSelector((state: RootState) => state.data.data.player?.Apps?.home) ?? [];
  const dockedApps: string[] = useSelector((state: RootState) => state.data.data.player?.Apps?.dock) ?? [];
  const folders = useSelector((state: RootState) => state.phone.folders);
  const folderBlurOpen = useSelector((state: RootState) => state.phone.folderBlurOpen);

  const setFolders = useCallback((newFolders: typeof folders) => {
    dispatch({ type: 'SET_FOLDERS', payload: newFolders });
  }, [dispatch]);

  const saveFolders = useCallback((newFolders: typeof folders) => {
    if (!IS_DEV) Nui.send('SaveFolders', { folders: newFolders });
  }, []);

  const [page, setPage] = useState(0);
  const NUM_PAGES = 2;
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [creatingFolder, setCreatingFolder] = useState<{ app: string } | null>(null);
  const [folderName, setFolderName] = useState('');
  const [ctx, setCtx] = useState<{ app: string; x: number; y: number; isDock: boolean } | null>(null);

  // ── Order state — stored in refs to survive re-renders ──
  const homeOrderRef = useRef<string[]>([]);
  const [homeOrder, setHomeOrderState] = useState<string[]>([]);
  const setHomeOrder = useCallback((updater: (prev: string[]) => string[]) => {
    const next = updater(homeOrderRef.current);
    homeOrderRef.current = next;
    setHomeOrderState(next);
  }, []);
  const [dockOrder, setDockOrder] = useState<string[]>([]);

  // ── Drag state ──
  // What is being dragged: { type: 'app'|'folder', id: string, fromDock: boolean }
  const dragState = useRef<{ type: 'app' | 'folder'; id: string; fromDock: boolean } | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [renamingFolder, setRenamingFolder] = useState<{ id: string; name: string } | null>(null);
  const [renameName, setRenameName] = useState('');
  const [dragOverApp, setDragOverApp] = useState<string | null>(null);
  const [dragOverFolder, setDragOverFolder] = useState<string | null>(null);
  const [dragOverDock, setDragOverDock] = useState(false);

  // Ghost element for visual drag feedback
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const mouseStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const justDraggedRef = useRef(false);

  // Merge/reorder timer
  const mergeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mergeTargetRef = useRef<string | null>(null);
  const folderReorderTargetRef = useRef<string | null>(null);
  // Dock drag — track pending target for drop-only reorder
  const dockDragTargetRef = useRef<string | null>(null);
  // Home reorder dead-zone — prevent immediate re-trigger after reorder
  const lastHomeReorderRef = useRef<{ dragged: string; target: string } | null>(null);

  // Swipe
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);

  // homeRef for ctx positioning
  const homeRef = useRef<HTMLDivElement>(null);

  // ── Sync order from server ──
  useEffect(() => {
    setHomeOrder(prev => {
      const kept = prev.filter(a => homeApps.includes(a));
      const added = homeApps.filter(a => !prev.includes(a));
      if (kept.length === prev.length && added.length === 0) return prev;
      return [...kept, ...added];
    });
  }, [homeApps.join(',')]);

  useEffect(() => {
    setDockOrder(prev => {
      const kept = prev.filter(a => dockedApps.includes(a));
      const added = dockedApps.filter(a => !prev.includes(a));
      return [...kept, ...added];
    });
  }, [dockedApps.join(',')]);

  // ── Close folder when home dispatched ──
  useEffect(() => { if (!folderBlurOpen) setOpenFolder(null); }, [folderBlurOpen]);
  useEffect(() => {
    dispatch({ type: openFolder ? 'FOLDER_BLUR_OPEN' : 'FOLDER_BLUR_CLOSE' });
    return () => { dispatch({ type: 'FOLDER_BLUR_CLOSE' }); };
  }, [openFolder]);

  useEffect(() => { dispatch({ type: 'NOTIF_RESET_APP' }); }, []);

  // ── Derived state ──
  const folderAppKeySet = new Set(folders.flatMap(f => f.apps));
  const dockedSet = new Set(dockedApps);
  if (homeOrderRef.current.length === 0 && homeApps.length > 0) homeOrderRef.current = [...homeApps];
  const currentOrder = homeOrderRef.current.length ? homeOrderRef.current : homeApps;
  const freeApps = currentOrder.filter(a => !!apps[a] && !folderAppKeySet.has(a) && !dockedSet.has(a));
  const pageApps = [freeApps.slice(0, APPS_PER_PAGE), freeApps.slice(APPS_PER_PAGE)];
  const orderedDock = dockOrder.filter(a => dockedApps.includes(a));

  // ── Redux helpers ──
  const patchApps = (newHome: string[], newDock: string[]) => {
    dispatch({ type: 'SET_DATA', payload: { type: 'player', data: { ...player, Apps: { ...player?.Apps, home: newHome, dock: newDock } } } });
  };

  const reorderHomeArr = (dragged: string, target: string) => {
    setHomeOrder(prev => {
      const next = prev.filter(a => a !== dragged);
      const idx = next.indexOf(target);
      if (idx === -1) return [...next, dragged];
      next.splice(idx, 0, dragged);
      return next;
    });
  };

  const reorderDockArr = (dragged: string, target: string) => {
    setDockOrder(prev => {
      const next = prev.filter(a => a !== dragged);
      const idx = next.indexOf(target);
      if (idx === -1) return [...next, dragged];
      next.splice(idx, 0, dragged);
      // Persist the new dock order to the server
      const newDock = next.filter(a => dockedApps.includes(a));
      patchApps(homeApps, newDock);
      if (!IS_DEV) Nui.send('Dock', { action: 'reorder', order: newDock });
      return next;
    });
  };

  const reorderFolderArr = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    const next = [...folders];
    const from = next.findIndex(f => f.id === fromId);
    const to = next.findIndex(f => f.id === toId);
    if (from === -1 || to === -1) return;
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setFolders(next);
    saveFolders(next);
  };

  const mergeIntoFolder = (draggedApp: string, targetApp: string) => {
    if (draggedApp === targetApp) return;
    const nameA = apps[draggedApp]?.label ?? draggedApp;
    const nameB = apps[targetApp]?.label ?? targetApp;
    const autoName = `${nameA} & ${nameB}`.length > 18 ? 'New Folder' : `${nameA} & ${nameB}`;
    const newFolder = { id: `folder_${Date.now()}`, name: autoName, apps: [targetApp, draggedApp], page };
    const updated = [...folders, newFolder];
    setFolders(updated); saveFolders(updated);
    // Home cleanup is handled atomically by the SaveFolders server callback
  };

  const addAppToFolder = (folderId: string, app: string) => {
    if (!app || folders.find(f => f.id === folderId)?.apps.includes(app)) return;
    const updated = folders.map(f => f.id === folderId ? { ...f, apps: [...f.apps, app] } : f);
    setFolders(updated); saveFolders(updated);
    // Home cleanup is handled atomically by the SaveFolders server callback
  };

  const handleDropOutOfFolder = (folderId: string, app: string) => {
    const updated = folders
      .map(f => f.id === folderId ? { ...f, apps: f.apps.filter(a => a !== app) } : f)
      .filter(f => f.apps.length > 0);
    setFolders(updated); saveFolders(updated);
    if (!IS_DEV) Nui.send('Home', { action: 'add', app });
    showAlert(`${apps[app]?.label ?? app} removed from folder`);
  };

  // ── Ghost element helpers ──
  const removeGhost = () => {
    if (ghostRef.current) { ghostRef.current.remove(); ghostRef.current = null; }
  };

  const clearMergeTimer = () => {
    if (mergeTimerRef.current) { clearTimeout(mergeTimerRef.current); mergeTimerRef.current = null; }
    mergeTargetRef.current = null;
  };

  // ── Find droppable at point ──
  const getDropTarget = (x: number, y: number) => {
    // Temporarily hide ghost so elementFromPoint works
    if (ghostRef.current) ghostRef.current.style.display = 'none';
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (ghostRef.current) ghostRef.current.style.display = 'flex';

    if (!el) return null;
    const appEl = el.closest('[data-app-id]') as HTMLElement | null;
    if (appEl) return { type: 'app' as const, id: appEl.dataset.appId!, isDock: appEl.dataset.isDock === '1' };
    const folderEl = el.closest('[data-folder-id]') as HTMLElement | null;
    if (folderEl) return { type: 'folder' as const, id: folderEl.dataset.folderId! };
    const dockEl = el.closest('[data-is-dock-zone]') as HTMLElement | null;
    if (dockEl) return { type: 'dock-zone' as const };
    return null;
  };

  // ── Mouse drag start ──
  const startDrag = (e: React.MouseEvent, type: 'app' | 'folder', id: string, fromDock = false) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    mouseStartRef.current = { x: e.clientX, y: e.clientY };
    isDraggingRef.current = false;
    dragState.current = { type, id, fromDock };

    const data = type === 'app' ? apps[id] : null;
    const folder = type === 'folder' ? folders.find(f => f.id === id) : null;

    const onMove = (me: MouseEvent) => {
      if (!mouseStartRef.current) return;
      const dx = me.clientX - mouseStartRef.current.x;
      const dy = me.clientY - mouseStartRef.current.y;
      if (!isDraggingRef.current && Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;

      if (!isDraggingRef.current) {
        isDraggingRef.current = true;
        setDraggingId(id);
        removeGhost();
        const ghost = document.createElement('div');
        const color = type === 'app' && data ? data.color : 'rgba(255,255,255,0.2)';
        const border = type === 'folder' ? `2px solid ${TEAL}` : 'none';
        ghost.style.cssText = `position:fixed;left:${me.clientX-28}px;top:${me.clientY-28}px;width:56px;height:56px;border-radius:14px;background:${color};display:flex;align-items:center;justify-content:center;color:#fff;pointer-events:none;z-index:99999;opacity:0.85;transform:scale(1.15);box-shadow:0 8px 24px rgba(0,0,0,0.5);border:${border};`;
        // Clone SVG icon from the actual DOM element
        const selector = type === 'app' ? `[data-app-id="${id}"] .app-icon svg` : `[data-folder-id="${id}"] svg`;
        const srcSvg = document.querySelector(selector) as SVGElement | null;
        if (srcSvg) {
          const clone = srcSvg.cloneNode(true) as SVGElement;
          clone.setAttribute('width', '24');
          clone.setAttribute('height', '24');
          clone.style.pointerEvents = 'none';
          ghost.appendChild(clone);
        }
        document.body.appendChild(ghost);
        ghostRef.current = ghost;
      }

      if (ghostRef.current) {
        ghostRef.current.style.left = `${me.clientX - 28}px`;
        ghostRef.current.style.top = `${me.clientY - 28}px`;
      }

      // Determine what's under cursor
      const target = getDropTarget(me.clientX, me.clientY);

      // Update highlight state
      if (target?.type === 'app') {
        setDragOverApp(target.id);
        setDragOverFolder(null);
        setDragOverDock(false);

        if (type === 'app' && !fromDock) {
          // Home app over home app — delayed reorder, quick = merge
          if (target.id !== id && !target.isDock) {
            // Skip if this is the same pair we just reordered (dead-zone)
            const last = lastHomeReorderRef.current;
            const alreadyDone = last && last.dragged === id && last.target === target.id;
            if (mergeTargetRef.current !== target.id && !alreadyDone) {
              clearMergeTimer();
              mergeTargetRef.current = target.id;
              mergeTimerRef.current = setTimeout(() => {
                if (mergeTargetRef.current === target.id && dragState.current?.id === id) {
                  lastHomeReorderRef.current = { dragged: id, target: target.id };
                  reorderHomeArr(id, target.id);
                }
                mergeTimerRef.current = null;
              }, MERGE_DELAY);
            }
          } else if (target.id === id) {
            // Dragged back over itself — reset dead-zone so next target works
            lastHomeReorderRef.current = null;
          }
        } else if (type === 'app' && fromDock && target.isDock) {
          // Live reorder as you drag over dock slots (same dead-zone pattern as home)
          if (target.id !== id) {
            const prevTarget = dockDragTargetRef.current;
            setDragOverApp(target.id);
            if (prevTarget !== target.id) {
              dockDragTargetRef.current = target.id;
              reorderDockArr(id, target.id);
            }
          }
        }
      } else if (target?.type === 'folder') {
        setDragOverApp(null);
        setDragOverFolder(target.id);
        setDragOverDock(false);
        clearMergeTimer();

        if (type === 'folder' && target.id !== id) {
          if (folderReorderTargetRef.current !== target.id) {
            folderReorderTargetRef.current = target.id;
            reorderFolderArr(id, target.id);
          }
        }
      } else if (target?.type === 'dock-zone') {
        setDragOverApp(null);
        setDragOverFolder(null);
        setDragOverDock(true);
        clearMergeTimer();
      } else {
        setDragOverApp(null);
        setDragOverFolder(null);
        setDragOverDock(false);
      }
    };

    const onUp = (me: MouseEvent) => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);

      if (!isDraggingRef.current) {
        // It was a click, not a drag — handled by onClick
        dragState.current = null;
        mouseStartRef.current = null;
        return;
      }

      const target = getDropTarget(me.clientX, me.clientY);
      const ds = dragState.current;

      if (ds) {
        if (ds.type === 'app') {
          const appId = ds.id;
          if (target?.type === 'app') {
            if (ds.fromDock && target.isDock) {
              // Reorder already happened live during onMove — nothing to do on drop
            } else if (ds.fromDock && !target.isDock) {
              // dock → home
              if (!IS_DEV) Nui.send('Home', { action: 'add', app: appId });
              patchApps([...homeApps.filter(a => a !== appId), appId], dockedApps.filter(a => a !== appId));
            } else if (!ds.fromDock && !target.isDock && target.id !== appId) {
              // home → home: merge or reorder
              if (mergeTimerRef.current !== null || mergeTargetRef.current === target.id) {
                // timer still pending = quick drop = merge
                clearMergeTimer();
                mergeIntoFolder(appId, target.id);
              }
              // if timer already fired = reorder already happened, do nothing
            }
          } else if (target?.type === 'folder') {
            addAppToFolder(target.id, appId);
          } else if (target?.type === 'dock-zone') {
            if (!ds.fromDock && !dockedApps.includes(appId)) {
              if (dockedApps.length < 4) {
                if (!IS_DEV) Nui.send('Dock', { action: 'add', app: appId });
                patchApps(homeApps.filter(a => a !== appId), [...dockedApps.filter(a => a !== appId), appId]);
                showAlert(`${apps[appId]?.label} Added To Dock`);
              } else {
                showAlert('Dock is full — max 4 apps');
              }
            }
          } else {
            // Dropped on empty space
            if (ds.fromDock) {
              // dock → empty home area = undock, add to home
              if (!IS_DEV) Nui.send('Home', { action: 'add', app: appId });
              patchApps([...homeApps.filter(a => a !== appId), appId], dockedApps.filter(a => a !== appId));
            } else if (mergeTargetRef.current && mergeTargetRef.current !== appId) {
              // home app dropped near another — use last known merge target
              if (mergeTimerRef.current !== null) {
                clearMergeTimer();
                mergeIntoFolder(appId, mergeTargetRef.current);
              }
            }
          }
        } else if (ds.type === 'folder') {
          // Folder dropped — reorder already happened live, just save
          if (target?.type === 'folder' && target.id !== ds.id) {
            reorderFolderArr(ds.id, target.id);
          }
        }
      }

      // Cleanup
      clearMergeTimer();
      folderReorderTargetRef.current = null;
      dockDragTargetRef.current = null;
      lastHomeReorderRef.current = null;
      dragState.current = null;
      mouseStartRef.current = null;
      const wasDragging = isDraggingRef.current;
      isDraggingRef.current = false;
      if (wasDragging) {
        justDraggedRef.current = true;
        setTimeout(() => { justDraggedRef.current = false; }, 50);
      }
      removeGhost();
      setDraggingId(null);
      setDragOverApp(null);
      setDragOverFolder(null);
      setDragOverDock(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // ── Right click ──
  const onRightClick = (e: React.MouseEvent, app: string, isDock = false) => {
    e.preventDefault();
    e.stopPropagation();
    setCtx({ app, x: e.clientX - 2, y: e.clientY - 4, isDock });
  };

  // ── App/folder action handlers ──
  const handleAddToHome = async () => { if (!ctx) return; await appButton('add', 'Home', ctx.app); showAlert(`${apps[ctx.app]?.label} Added To Home Screen`); };
  const handleRemoveFromHome = async () => { if (!ctx) return; await appButton('remove', 'Home', ctx.app); showAlert(`${apps[ctx.app]?.label} Removed From Home Screen`); };
  const handleDock = async () => { if (!ctx) return; if (dockedApps.length < 4) { await appButton('add', 'Dock', ctx.app); showAlert(`${apps[ctx.app]?.label} Added To Dock`); } else showAlert('Can Only Have 4 Apps In Dock'); };
  const handleUndock = async () => { if (!ctx) return; await appButton('remove', 'Dock', ctx.app); showAlert(`${apps[ctx.app]?.label} Removed From Dock`); };
  const handleCreateFolder = () => { if (!ctx) return; setCreatingFolder({ app: ctx.app }); setFolderName('New Folder'); };

  const [folderCtx, setFolderCtx] = useState<{ id: string; name: string; x: number; y: number } | null>(null);

  const onFolderRightClick = (e: React.MouseEvent, folderId: string, folderCurrentName: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFolderCtx({ id: folderId, name: folderCurrentName, x: e.clientX - 2, y: e.clientY - 4 });
  };

  const confirmRenameFolder = () => {
    if (!renamingFolder) return;
    const updated = folders.map(f => f.id === renamingFolder.id ? { ...f, name: renameName.trim() || f.name } : f);
    setFolders(updated); saveFolders(updated);
    setRenamingFolder(null);
  };

  const confirmCreateFolder = () => {
    if (!creatingFolder) return;
    const newFolder = { id: `folder_${Date.now()}`, name: folderName.trim() || 'New Folder', apps: [creatingFolder.app], page };
    const updated = [...folders, newFolder];
    setFolders(updated); saveFolders(updated);
    // Home cleanup handled atomically by SaveFolders server callback
    setCreatingFolder(null); setFolderName('');
  };

  // ── Render app button ──
  const renderAppBtn = (app: string, isDock = false) => {
    const data = apps[app];
    if (!data) return null;
    const isCtx = ctx?.app === app && ctx?.isDock === isDock;
    const isDropTarget = dragOverApp === app && draggingId !== app;
    const isBeingDragged = draggingId === app;

    return (
      <div
        key={`${app}-${isDock}`}
        data-app-id={app}
        data-is-dock={isDock ? '1' : '0'}
        onMouseDown={e => startDrag(e, 'app', app, isDock)}
        onClick={() => { if (!isDraggingRef.current && !justDraggedRef.current) { openedApp(app); navigate(`/apps/${app}`); } }}
        onContextMenu={e => onRightClick(e, app, isDock)}
        style={{
          width: isDock ? '20%' : '25%', display: 'inline-flex', flexDirection: 'column',
          alignItems: 'center', padding: isDock ? '6px 4px' : '8px 4px', borderRadius: 14,
          cursor: 'grab', boxSizing: 'border-box', flexShrink: 0,
          background: isDropTarget ? TEAL_20 : isCtx ? TEAL_20 : 'transparent',
          border: isDropTarget ? `2px solid ${TEAL}` : isCtx ? `1px solid ${TEAL_50}` : '2px solid transparent',
          opacity: isBeingDragged ? 0.35 : 1,
          transform: isDropTarget ? 'scale(1.08)' : 'scale(1)',
          transition: 'background 0.15s, border 0.15s, opacity 0.15s, transform 0.15s',
          userSelect: 'none',
        }}
      >
        <div className="app-icon" style={{ width: isDock ? '3.2rem' : '3.4rem', height: isDock ? '3.2rem' : '3.4rem', borderRadius: '1rem', background: data.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#fff', boxShadow: isDropTarget ? `0 0 0 3px ${TEAL}, 0 3px 12px rgba(0,0,0,0.45)` : '0 3px 12px rgba(0,0,0,0.45)', flexShrink: 0, transition: 'box-shadow 0.15s' }}>
          <FontAwesomeIcon icon={data.icon} />
        </div>
        {!isDock && (
          <div style={{ fontSize: 14, color: isDropTarget ? TEAL : 'rgba(255,255,255,0.8)', marginTop: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90%', pointerEvents: 'none', fontFamily: "'Oswald', sans-serif", fontWeight: 400, letterSpacing: '0.04em', textAlign: 'center', transition: 'color 0.15s' }}>
            {data.label}
          </div>
        )}
      </div>
    );
  };

  // ── Render ──
  return (
    <div
      ref={homeRef}
      style={{ height: '100%', userSelect: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}
    >
      <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <div style={{ display: 'flex', width: `${NUM_PAGES * 100}%`, transform: `translateX(-${(page / NUM_PAGES) * 100}%)`, transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)', height: '100%' }}>
          {Array.from({ length: NUM_PAGES }).map((_, p) => (
            <div
              key={p}
              style={{ width: `${100 / NUM_PAGES}%`, flexShrink: 0, display: 'flex', flexWrap: 'wrap', padding: '2px 6px 0 6px', alignContent: 'flex-start', overflow: 'hidden' }}
              onMouseDown={e => {
                if (e.target !== e.currentTarget) return;
                swipeStartX.current = e.clientX;
                swipeStartY.current = e.clientY;
                const onMove = (me: MouseEvent) => {
                  if (swipeStartX.current !== null && Math.abs(me.clientX - swipeStartX.current) > 8) isDraggingRef.current = true;
                };
                const onUp = (me: MouseEvent) => {
                  window.removeEventListener('mousemove', onMove);
                  window.removeEventListener('mouseup', onUp);
                  if (swipeStartX.current === null) return;
                  const dx = me.clientX - swipeStartX.current;
                  const dy = Math.abs(me.clientY - (swipeStartY.current ?? 0));
                  if (isDraggingRef.current && Math.abs(dx) > 40 && dy < 60) {
                    if (dx < 0 && page < NUM_PAGES - 1) setPage(pg => pg + 1);
                    if (dx > 0 && page > 0) setPage(pg => pg - 1);
                  }
                  swipeStartX.current = null; swipeStartY.current = null; isDraggingRef.current = false;
                };
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
              }}
            >
              {pageApps[p]?.map(app => renderAppBtn(app))}
              {folders.filter(f => f.page === p).map(folder => (
                <FolderIcon
                  key={folder.id}
                  folder={folder} apps={apps}
                  teal={TEAL} teal20={TEAL_20}
                  isBeingDragged={draggingId === folder.id}
                  isDragTarget={dragOverFolder === folder.id && draggingId !== folder.id}
                  onMouseDown={e => startDrag(e, 'folder', folder.id)}
                  onOpen={() => { if (!isDraggingRef.current && !justDraggedRef.current) setOpenFolder(folder.id); }}
                  onContextMenu={e => onFolderRightClick(e, folder.id, folder.name)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div onClick={() => navigate('/apps')} style={{ textAlign: 'center', padding: '2px 0', fontSize: 18, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.15s', flexShrink: 0 }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = TEAL; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}>
        <FontAwesomeIcon icon="angle-up" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, padding: '4px 0', flexShrink: 0 }}>
        {Array.from({ length: NUM_PAGES }).map((_, i) => (
          <div key={i} onClick={() => setPage(i)} style={{ width: page === i ? 22 : 9, height: 9, borderRadius: 5, background: page === i ? TEAL : 'rgba(255,255,255,0.3)', transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer' }} />
        ))}
      </div>

      {/* Dock */}
      <div
        data-is-dock-zone="1"
        style={{ flexShrink: 0, height: '13%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', margin: '0 28px 8px 28px', borderRadius: 22, background: dragOverDock ? hexAlpha(TEAL, 0.18) : 'rgba(8,10,14,0.65)', padding: '0 4px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden', border: dragOverDock ? `1.5px solid ${TEAL}` : '1.5px solid transparent', transition: 'background 0.15s, border 0.15s' }}
      >
        {(orderedDock.length ? orderedDock : dockedApps).slice(0, 4).map(app => renderAppBtn(app, true))}
      </div>

      {/* Folder overlay */}
      {openFolder && (() => {
        const folder = folders.find(f => f.id === openFolder);
        if (!folder) return null;
        return (
          <FolderOverlay
            folder={folder} apps={apps}
            onClose={() => setOpenFolder(null)}
            onOpen={app => { openedApp(app); navigate(`/apps/${app}`); setOpenFolder(null); }}
            onDropIn={app => addAppToFolder(folder.id, app)}
            onDropOut={app => { handleDropOutOfFolder(folder.id, app); setOpenFolder(null); }}
            teal={TEAL} teal50={TEAL_50} teal20={TEAL_20}
          />
        );
      })()}

      {/* Context menu */}
      {ctx && (
        <CtxMenu
          app={ctx.app} appLabel={apps[ctx.app]?.label ?? ctx.app}
          position={{ x: ctx.x, y: ctx.y }}
          isHome={homeApps.includes(ctx.app)} isDocked={dockedApps.includes(ctx.app)} isDockFull={dockedApps.length >= 4}
          onClose={() => setCtx(null)}
          onAddHome={handleAddToHome} onRemoveHome={handleRemoveFromHome}
          onDock={handleDock} onUndock={handleUndock}
          onOpen={() => { openedApp(ctx.app); navigate(`/apps/${ctx.app}`); }}
          onCreateFolder={handleCreateFolder}
          teal={TEAL} teal50={TEAL_50} teal20={TEAL_20}
        />
      )}

      {/* Folder context menu */}
      {folderCtx && (
        <Menu
          keepMounted
          open
          onClose={() => setFolderCtx(null)}
          anchorReference="anchorPosition"
          anchorPosition={{ left: folderCtx.x, top: folderCtx.y }}
          PaperProps={{ style: { background: 'transparent', boxShadow: 'none', overflow: 'visible', backdropFilter: 'none', WebkitBackdropFilter: 'none' } }}
        >
          <div style={{ minWidth: 180, backgroundColor: 'rgb(8,10,14)', backgroundImage: `linear-gradient(135deg, ${TEAL_20} 0%, rgba(8,10,14,0.98) 100%)`, border: `1px solid ${TEAL_50}`, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.7)', overflow: 'hidden' }}>
            <div style={{ padding: '8px 14px 6px', fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEAL, borderBottom: `1px solid ${TEAL_50}` }}>{folderCtx.name}</div>
            <div
              onClick={() => { setRenamingFolder({ id: folderCtx.id, name: folderCtx.name }); setRenameName(folderCtx.name); setFolderCtx(null); }}
              style={{ padding: '9px 14px', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.05em', color: '#fff', cursor: 'pointer', transition: 'background 0.12s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = TEAL_20; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >Rename Folder</div>
          </div>
        </Menu>
      )}

      {/* Rename folder dialog */}
      {renamingFolder && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setRenamingFolder(null)}>
          <div style={{ backgroundColor: 'rgb(8,10,14)', backgroundImage: `linear-gradient(135deg, ${TEAL_20} 0%, rgba(8,10,14,0.98) 100%)`, border: `1px solid ${TEAL_50}`, borderRadius: 16, padding: '20px 20px 16px', width: '75%', boxShadow: '0 8px 32px rgba(0,0,0,0.7)' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.06em', color: '#fff', marginBottom: 12, textAlign: 'center' }}>Rename Folder</div>
            <input autoFocus value={renameName} onChange={e => setRenameName(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') confirmRenameFolder(); if (e.key === 'Escape') setRenamingFolder(null); }} style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL_50}`, borderRadius: 8, padding: '9px 12px', color: '#fff', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.04em', outline: 'none', marginBottom: 14 }} placeholder="Folder name..." />
            <div style={{ display: 'flex', gap: 8 }}>
              <div onClick={() => setRenamingFolder(null)} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: 8, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.08em', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>CANCEL</div>
              <div onClick={confirmRenameFolder} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: 8, cursor: 'pointer', background: TEAL_20, border: `1px solid ${TEAL_50}`, color: TEAL, fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.08em', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = hexAlpha(TEAL, 0.35))} onMouseLeave={e => (e.currentTarget.style.background = TEAL_20)}>RENAME</div>
            </div>
          </div>
        </div>
      )}

      {/* Create folder dialog */}
      {creatingFolder && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setCreatingFolder(null)}>
          <div style={{ backgroundColor: 'rgb(8,10,14)', backgroundImage: `linear-gradient(135deg, ${TEAL_20} 0%, rgba(8,10,14,0.98) 100%)`, border: `1px solid ${TEAL_50}`, borderRadius: 16, padding: '20px 20px 16px', width: '75%', boxShadow: '0 8px 32px rgba(0,0,0,0.7)' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.06em', color: '#fff', marginBottom: 12, textAlign: 'center' }}>New Folder</div>
            <input autoFocus value={folderName} onChange={e => setFolderName(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') confirmCreateFolder(); if (e.key === 'Escape') setCreatingFolder(null); }} style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)', border: `1px solid ${TEAL_50}`, borderRadius: 8, padding: '9px 12px', color: '#fff', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.04em', outline: 'none', marginBottom: 14 }} placeholder="Folder name..." />
            <div style={{ display: 'flex', gap: 8 }}>
              <div onClick={() => setCreatingFolder(null)} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: 8, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.08em', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>CANCEL</div>
              <div onClick={confirmCreateFolder} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: 8, cursor: 'pointer', background: TEAL_20, border: `1px solid ${TEAL_50}`, color: TEAL, fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.08em', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = hexAlpha(TEAL, 0.35))} onMouseLeave={e => (e.currentTarget.style.background = TEAL_20)}>CREATE</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
