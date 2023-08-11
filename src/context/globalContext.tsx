import { nanoid } from 'nanoid'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface Props {
	children?: ReactNode
}

interface Filter {
	type?: string
	category?: string
}

interface TransactionsContextData {
	transactionList: Transactions[]
	addNewTransaction: (transaction: TransactionInput) => void
	editTransaction: (transaction: Transactions) => void
	removeTransaction: (transaction: Transactions) => void
	handleCloseModalForm: () => void
	handleOpenModalForm: () => void
	modalForm: boolean
	transactionSelected: Transactions | undefined
	setTransactionSelected: (transaction: Transactions) => void
	handleCloseModalDelete: () => void
	handleOpenModalDelete: () => void
	modalDelete: boolean
	categories: string[]
	filterSelected: Filter
	setFilterSelected: (filters: Filter) => void
}

export const TransactionsContext = createContext<TransactionsContextData>(
	{} as TransactionsContextData
)

export const TransactionsStorage = ({ children }: Props) => {
	const [transactionList, setTransactionList] = useState<Transactions[]>(
		() => {
			const storageListTransaction =
				localStorage.getItem('transactionList')

			if (storageListTransaction)
				return JSON.parse(storageListTransaction)

			return []
		}
	)
	const [modalForm, setModalForm] = useState(false)
	const [transactionSelected, setTransactionSelected] = useState<any>()
	const [modalDelete, setModalDelete] = useState(false)
	const [filterSelected, setFilterSelected] = useState<any>()

	const categories = [
		'salário',
		'bônus',
		'freelancer',
		'aluguel',
		'projetos',
		'conta de luz',
		'saúde',
		'educação',
		'beleza',
		'compras',
		'automóveis',
		'imóveis',
		'vendas',
		'cartão de crédito',
		'empréstimos',
		'financiamentos',
		'consertos e reparos',
		'outros'
	]

	const handleCloseModalForm = () => setModalForm(false)
	const handleOpenModalForm = () => setModalForm(true)

	const handleCloseModalDelete = () => setModalDelete(false)
	const handleOpenModalDelete = () => setModalDelete(true)

	const addNewTransaction = (transaction: TransactionInput) => {
		const newTransaction = {
			...transaction,
			createdAt: new Date().toISOString(),
			id: nanoid()
		}

		setTransactionList((transactionList) => [
			...transactionList,
			newTransaction
		])
	}

	const editTransaction = (transactionSelected: Transactions) => {
		const getTransaction = transactionList.find(
			(transaction) => transaction.id === transactionSelected.id
		)

		if (getTransaction) {
			const transactionIndex = transactionList.findIndex(
				(transaction) => transaction.id === transactionSelected.id
			)

			const newTransactions = [...transactionList]
			newTransactions[transactionIndex] = transactionSelected

			setTransactionList(newTransactions)
		}
	}

	const removeTransaction = (transactionRemove: Transactions) => {
		const newTransactions = transactionList.filter(
			(transaction) => transaction.id !== transactionRemove.id
		)
		setTransactionList(newTransactions)
	}

	useEffect(() => {
		transactionList.length &&
			localStorage.setItem(
				'transactionList',
				JSON.stringify(transactionList)
			)
	}, [transactionList])

	return (
		<TransactionsContext.Provider
			value={{
				transactionList,
				addNewTransaction,
				editTransaction,
				removeTransaction,
				modalForm,
				handleCloseModalForm,
				handleOpenModalForm,
				transactionSelected,
				setTransactionSelected,
				modalDelete,
				handleCloseModalDelete,
				handleOpenModalDelete,
				categories,
				filterSelected,
				setFilterSelected
			}}
		>
			{children}
		</TransactionsContext.Provider>
	)
}
