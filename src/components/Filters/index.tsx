import { useContext, useEffect, useState } from 'react'
import { TransactionsContext } from '../../context/globalContext'
import styles from './styles.module.scss'

export function Filters() {
	const { categories, setFilterSelected } = useContext(TransactionsContext)
	const [typeSelected, setTypeSelected] = useState('')
	const [categorySelected, setCategorySelected] = useState('')

	useEffect(() => {
		setFilterSelected({
			type: typeSelected,
			category: categorySelected
		})
	}, [typeSelected, categorySelected])

	return (
		<div className={styles.content}>
			<div className={styles.filter}>
				<label htmlFor="type">Tipo</label>
				<select
					value={typeSelected}
					onChange={(e) => setTypeSelected(e.target.value)}
					id="type"
				>
					<option value="">Todas</option>
					<option value="earnings">Entradas</option>
					<option value="spending">Saídas</option>
				</select>
			</div>

			<div className={styles.filter}>
				<label htmlFor="type">Categorias</label>
				<select
					value={categorySelected}
					onChange={(e) => setCategorySelected(e.target.value)}
					id="category"
				>
					<option value="">Todas</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
