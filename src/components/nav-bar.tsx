import NavLinks from './nav-links'

const NavBar: React.FC = () => (
  <nav>
    <div className="flex h-full flex-col px-3 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  </nav>
)

export default NavBar
