import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react'

interface TransactionProviderProps {
	children: ReactNode
}

interface TransactionsContextData {
	transactionList: Transaction[]
	addNewTransaction: (transaction: Transaction) => void
	editTransaction: (transactionEdit: Transaction) => void
	removeTransaction: (transactionRemove: Transaction) => void
}

const TransactionsContext = createContext<TransactionsContextData>(
	{} as TransactionsContextData
)

export function TransactionsProvider({
	children
}: TransactionProviderProps): JSX.Element {
	const [transactionList, setTransactionList] = useState<Transaction[]>(
		() => {
			const storagedList = localStorage.getItem(
				'SenFinanca@:transactions'
			)

			if (storagedList) {
				return JSON.parse(storagedList)
			}

			return []
		}
	)

	const addNewTransaction = (transaction: Transaction) =>
		setTransactionList((transactionList) => [
			...transactionList,
			transaction
		])

	const editTransaction = (transactionEdit: Transaction) => {
		const getTransaction = transactionList.find(
			(transaction) => transaction.id === transactionEdit.id
		)

		if (getTransaction) {
			const transactionIndex = transactionList.findIndex(
				(transaction) => transaction.id === transactionEdit.id
			)

			const newTransactions = [...transactionList]
			newTransactions[transactionIndex] = transactionEdit

			setTransactionList(newTransactions)
		}
	}

	const removeTransaction = (transactionRemove: Transaction) => {
		const newTransactions = transactionList.filter(
			(transaction) => transaction.id !== transactionRemove.id
		)
		setTransactionList(newTransactions)
	}

	const prevTransactionsRef = useRef<Transaction[]>()

	useEffect(() => {
		prevTransactionsRef.current = transactionList
	})

	const prevTransactions = prevTransactionsRef.current ?? transactionList

	useEffect(() => {
		if (prevTransactions !== transactionList) {
			localStorage.setItem(
				'SenFinanca@:transactions',
				JSON.stringify(transactionList)
			)
		}
	}, [transactionList, prevTransactions])

	return (
		<TransactionsContext.Provider
			value={{
				transactionList,
				addNewTransaction,
				editTransaction,
				removeTransaction
			}}
		>
			{children}
		</TransactionsContext.Provider>
	)
}

export function useCart(): TransactionsContextData {
	const context = useContext(TransactionsContext)

	return context
}
