import { useContext } from 'react'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../context/globalContext'
import styles from './styles.module.scss'

export function Summary() {
	const { transactionList } = useContext(TransactionsContext)

	const summary = transactionList.reduce(
		(acc, transaction) => {
			console.log(
				'🚀 ~ file: index.tsx:13 ~ Summary ~ transaction:',
				transaction
			)
			if (transaction.type == 'earnings') {
				acc.earnings += +transaction.value
				acc.total += +transaction.value
			} else {
				acc.spends += +transaction.value
				acc.total -= +transaction.value
			}

			return acc
		},
		{
			earnings: 0,
			spends: 0,
			total: 0
		}
	)
	console.log('🚀 ~ file: index.tsx:33 ~ Summary ~ summary:', summary)

	return (
		<div className={styles.container}>
			<div>
				<header>
					<p>Entradas</p>
					<img src={incomeImg} alt="Entradas" />
				</header>

				<strong>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(summary.earnings)}
				</strong>
			</div>

			<div>
				<header>
					<p>Saídas</p>
					<img src={outcomeImg} alt="Saídas" />
				</header>

				<strong>
					{' '}
					-{' '}
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(summary.spends)}
				</strong>
			</div>

			<div className="highlight-background">
				<header>
					<p>Total</p>
					<img src={totalImg} alt="Total" />
				</header>

				<strong>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(summary.total)}
				</strong>
			</div>
		</div>
	)
}
