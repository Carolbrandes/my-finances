import { useContext } from 'react'
import { TransactionsContext } from '../../context/globalContext'
import styles from './styles.module.scss'

export function ButtonNewTransaction() {
	const { handleOpenModalForm, setTransactionSelected, categories } =
		useContext(TransactionsContext)

	const handleButton = () => {
		setTransactionSelected({
			id: '',
			category: categories[0],
			title: '',
			type: 'earnings',
			value: '',
			createdAt: ''
		})
		handleOpenModalForm()
	}

	return (
		<button className={styles.button} type="button" onClick={handleButton}>
			Nova Transação
		</button>
	)
}
