import './styles/global.scss';
import FormContext from './components/form-context/FormContext';

function App() {
  return (
    <main 
      className='
        flex flex-col items-center min-h-screen min-w-screen bg-magnolia
        lg:justify-center'
      >
      <FormContext />
    </main>
  );
}

export default App;
