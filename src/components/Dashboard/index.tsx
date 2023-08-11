import { useContext } from 'react'
import { Form } from '../Form'
import { Header } from '../Header'
import { Transactions } from '../Transactions'
import { TransactionsContext } from '../../context/globalContext'
import { PopUp } from '../PopUp'
import { ConfirmDeleteModal } from '../ConfirmDeleteModal'
import { Filters } from '../Filters'
import { Summary } from '../Summary'

export function Dashboard() {
	const {
		modalForm,
		handleCloseModalForm,
		modalDelete,
		handleCloseModalDelete
	} = useContext(TransactionsContext)
	return (
		<>
			<Header />
			<div className="container">
				<Summary />
				<Filters />
				<Transactions />
			</div>

			{modalForm && (
				<PopUp isOpen={modalForm} onRequestClose={handleCloseModalForm}>
					<Form />
				</PopUp>
			)}

			{modalDelete && (
				<ConfirmDeleteModal
					modalDelete={modalDelete}
					handleCloseModalDelete={handleCloseModalDelete}
				/>
			)}
		</>
	)
}
