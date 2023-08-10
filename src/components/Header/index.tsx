import { ButtonNewTransaction } from '../ButtonNewTransaction'
import styles from './styles.module.scss'
import { TfiMoney } from 'react-icons/tfi'

export function Header() {
	return (
		<header className={styles.header}>
			<div className={`${styles.content} container`}>
				<h1>
					<TfiMoney size={35} color="#fff" />
					enFinança
				</h1>

				<ButtonNewTransaction />
			</div>
		</header>
	)
}
