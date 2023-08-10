import { Dashboard } from './components/Dashboard'
import { TransactionsStorage } from './context/globalContext'
import './styles/global.scss'

function App() {
	return (
		<TransactionsStorage>
			<Dashboard />
		</TransactionsStorage>
	)
}

export default App
