import { useContext } from 'react'
import { TransactionsContext } from '../../context/globalContext'
import styles from './styles.module.scss'

export function ButtonNewTransaction() {
	const { handleOpenModalForm } = useContext(TransactionsContext)

	return (
		<button
			className={styles.button}
			type="button"
			onClick={handleOpenModalForm}
		>
			Nova Transação
		</button>
	)
}
