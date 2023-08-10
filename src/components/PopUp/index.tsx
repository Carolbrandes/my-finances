import { ReactNode } from 'react'
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'

interface PopUpProps {
	isOpen: boolean
	onRequestClose: () => void
	children: ReactNode
}

export function PopUp({ isOpen, onRequestClose, children }: PopUpProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<>
				<button
					className="react-modal-close"
					type="button"
					onClick={onRequestClose}
				>
					<img src={closeImg} alt="fechar modal" />
				</button>

				<div>{children}</div>
			</>
		</Modal>
	)
}
