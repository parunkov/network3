import React, {useState, useEffect} from 'react';
import styles from './Paginator.module.scss';
import cn from 'classnames';

type PropsType = {
	totalItemsCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, 
 onPageChanged}) => {

	const DESKTOP_PORTION_SIZE = 10;
	const MOBILE_PORTION_SIZE = 4;
	const [portionSize, setPortionSize] = useState(DESKTOP_PORTION_SIZE);
	const pagesCount = Math.ceil(totalItemsCount / pageSize);
	const pages = [];
	for (let i = 1; i <= pagesCount ; i += 1) {
		pages.push(i);
	}
	const portionCount = Math.ceil(pagesCount / portionSize);
	const [portionNumber, setPortionNumber] = useState(1);
	const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	const rightPortionPageNumber = portionNumber * portionSize;

	const onPortionCanged = (portionNumber: number) => {
		let currentPageNumber = 1;
		if (portionNumber === 1) {
			currentPageNumber = 1;
		} else if (portionNumber === portionSize) {
			currentPageNumber = pagesCount;
		} else {
			currentPageNumber = (portionNumber - 1) * portionSize + (portionSize / 2);
		}
		onPageChanged(currentPageNumber);
	}

	const [editMode, setEditMode] = useState(false);
	const [inputValue, setInputValue] = useState(currentPage);
	useEffect(() => {
		setInputValue(currentPage);
	}, [currentPage]);
	const onInputChange = (e: any) => {
		setInputValue(e.currentTarget.value);
	}


	const CurrentPageElement = ({p}: any) => {
		if (!editMode) {
			return <span className={cn(styles.selectedPage, styles.pageNumber)} onClick={
				(e) => {setEditMode(true)}
			} key={p}>{p}</span>
		} else {
			return <input className={styles.input} onChange={onInputChange} onBlur={
				(e) => {
					let inputNumber = Math.floor(+e.currentTarget.value);
					if (inputNumber < 1) inputNumber = 1;
					if (inputNumber > pagesCount) inputNumber = pagesCount;
					setEditMode(false);
					currentPage = inputNumber;
					onPageChanged(inputNumber);
					setPortionNumber(Math.ceil(inputNumber / portionSize));
				}
			} autoFocus={true} type="number" step="1" min="1" max="{pagesCount}" value={inputValue} />
		}
	}


	const onResize = () => {
		if (window.innerWidth < 700) {
	    	setPortionSize(MOBILE_PORTION_SIZE);
	    } else {
	    	setPortionSize(DESKTOP_PORTION_SIZE);
	    }
	    setPortionNumber(Math.ceil(currentPage / portionSize));
	}
	useEffect(() => {
		onResize();
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
		}
	});

	return(
		<div className={styles.pagination}>
			{
				portionNumber > 1 && 
				<span>
					<button onClick={(e) => {
							onPageChanged(1);
							setPortionNumber(1);
						}}>1</button>
					<button className={cn(styles.arrow, styles.arrow_direction_left)} onClick={() => {
						setPortionNumber(portionNumber - 1);
						onPortionCanged(portionNumber - 1);
					}}><span>Prev</span></button>
				</span>
			}
			{
				pages
					.filter(p => p >= leftPortionPageNumber - 1 && p <= rightPortionPageNumber)
					.map(p => {	
						if (p === currentPage) {
							return <CurrentPageElement p={p} key={p} />
						} else {
							return <span className={styles.pageNumber} onClick={(e) => {onPageChanged(p)}} key={p}>{p}</span>
						}
					})
			}
			{
				portionCount > portionNumber && 
				<span>
					<button className={cn(styles.arrow, styles.arrow_direction_right)} onClick={() => {
						setPortionNumber(portionNumber + 1);
						onPortionCanged(portionNumber + 1);
					}}><span>Next</span></button>
					<button onClick={(e) => {
						onPageChanged(pagesCount);
						setPortionNumber(portionCount);
					}}>{pagesCount}</button>
				</span>
			}
		</div>
	);
}

export default Paginator;