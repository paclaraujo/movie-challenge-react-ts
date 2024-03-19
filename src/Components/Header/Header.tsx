import './Header.css';

const Header = () => {
  return <header className='header'>
    <h1 className='header__title'>MOVIEFLIX</h1>
    <ul className='header__itens'>
      <li>Filtrar</li>
      <li>Ordenar</li>
    </ul>
  </header>
};

export default Header;