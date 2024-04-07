import './styles/global.scss';
import FormContext from './components/form-context/FormContext';

function App() {
  return (
    <main 
      className='flex justify-center items-center min-h-screen min-w-screen bg-magnolia'>
      <FormContext />
    </main>
  );
}

export default App;
