interface Transactions {
	id: string
	title: string
	type: 'earnings' | 'spending'
	category: string
	value: number

	createdAt: string
}

type TransactionInput = Omit<Transactions, 'id' | 'createdAt'>

interface TransactionsTable extends Transactions {
	valueFormatted: string
}
