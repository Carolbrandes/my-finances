import moment from 'moment'
import { BiSolidEdit } from 'react-icons/bi'
import { TiDelete } from 'react-icons/ti'
import { TransactionsContext } from '../../../../context/globalContext'
import { useContext } from 'react'

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

	const handleEdit = () => {
		setTransactionSelected(transaction)
		handleOpenModalForm()
	}

	const handleDelete = () => {
		setTransactionSelected(transaction)
		handleOpenModalDelete()
	}

	return (
		<tr>
			<td>{moment(createdAt).format('D/MM/YYYY')}</td>
			<td>{title}</td>
			<td>{type == 'earnings' ? 'Entradas' : 'Saídas'}</td>
			<td>{category}</td>
			<td>{valueFormatted}</td>
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
