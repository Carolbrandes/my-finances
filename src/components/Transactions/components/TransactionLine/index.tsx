import moment from 'moment'
import { BiSolidEdit } from 'react-icons/bi'
import { TiDelete } from 'react-icons/ti'
import { TransactionsContext } from '../../../../context/globalContext'
import { useContext } from 'react'
import styles from '../../styles.module.scss'

interface TransactionLineProps {
	transaction: TransactionsTable
}

export function TransactionLine({ transaction }: TransactionLineProps) {
	const {
		handleOpenModalForm,
		setTransactionSelected,
		handleOpenModalDelete
	} = useContext(TransactionsContext)
	const { createdAt, title, type, category, valueFormatted } = transaction
	console.log('🚀 ~ file: index.tsx:18 ~ TransactionLine ~ type:', type)

	const handleEdit = () => {
		setTransactionSelected(transaction)
		handleOpenModalForm()
	}

	const handleDelete = () => {
		setTransactionSelected(transaction)
		handleOpenModalDelete()
	}

	const isEarning = type == 'earnings' ? true : false

	return (
		<tr>
			<td>{moment(createdAt).format('D/MM/YYYY')}</td>
			<td>{title}</td>
			<td>{isEarning ? 'Entradas' : 'Saídas'}</td>
			<td>{category}</td>
			<td className={styles[type]}>
				{isEarning ? valueFormatted : `-${valueFormatted}`}
			</td>
			<td>
				<button onClick={handleEdit} type="button">
					<BiSolidEdit size={20} />
				</button>
			</td>

			<td>
				<button onClick={handleDelete} type="button">
					<TiDelete size={25} />
				</button>
			</td>
		</tr>
	)
}
