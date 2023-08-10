import { TransactionsContext } from '../../context/globalContext'
import { PopUp } from '../PopUp'
import styles from './styles.module.scss'
import { useContext } from 'react'

interface ConfirmDeleteModalProps {
	handleCloseModalDelete: () => void
	modalDelete: boolean
}

export function ConfirmDeleteModal({
	modalDelete,
	handleCloseModalDelete
}: ConfirmDeleteModalProps) {
	const { transactionSelected, removeTransaction } =
		useContext(TransactionsContext)

	const handleDelete = () => {
		if (transactionSelected) {
			removeTransaction(transactionSelected)
			handleCloseModalDelete()
		}
	}

	return (
		<PopUp isOpen={modalDelete} onRequestClose={handleCloseModalDelete}>
			<div className={styles.content}>
				<h3>Deseja realmente excluir a transação?</h3>
				<p>
					<b>Título:</b> {transactionSelected?.title}
				</p>
				<p>
					<b>Valor:</b> {transactionSelected?.value}
				</p>

				<div className={styles.actionsWrapper}>
					<button
						className={styles.btnDelete}
						onClick={handleDelete}
						type="button"
					>
						Excluir
					</button>
					<button
						className={styles.btnCancel}
						onClick={handleCloseModalDelete}
						type="button"
					>
						Cancelar
					</button>
				</div>
			</div>
		</PopUp>
	)
}
