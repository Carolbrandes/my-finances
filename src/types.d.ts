interface Transactions {
	id: string
	title: string
	type: 'earnings' | 'spending'
	category: string
	value: number | string
	createdAt: string
}

type TransactionInput = Omit<Transactions, 'id' | 'createdAt'>
