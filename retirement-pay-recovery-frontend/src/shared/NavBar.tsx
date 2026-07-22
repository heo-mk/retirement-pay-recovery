import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  icon: string;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    to: '/',
    label: '전체 흐름',
    icon: '📋',
    description: '단계별 타임라인',
  },
  {
    to: '/diagnosis',
    label: '내 상황 진단',
    icon: '🔍',
    description: '지금 어디쯤인지 확인',
  },
  {
    to: '/criminal-track',
    label: '형사 트랙',
    icon: '⚖️',
    description: '고소·진정 절차',
  },
];

export default function NavBar() {
  return (
    <nav className="navbar" aria-label="주요 메뉴">
      <div className="navbar-inner">
        <span className="navbar-brand">퇴직금 회수</span>
        <ul className="navbar-list" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  ['navbar-item', isActive ? 'navbar-item--active' : ''].join(' ').trim()
                }
              >
                <span className="navbar-item-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="navbar-item-text">
                  <span className="navbar-item-label">{item.label}</span>
                  <span className="navbar-item-desc">{item.description}</span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
