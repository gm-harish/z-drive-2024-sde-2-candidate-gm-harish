export default function Stepper({
	onPrevClick,
	onNextClick,
	isPrevDisabled,
	isNextDisabled,
  }) {
	return (
	  <div>
		<button disabled={isPrevDisabled} onClick={onPrevClick}>
		  prev
		</button>
		<button disabled={isNextDisabled} onClick={onNextClick}>
		  next
		</button>
	  </div>
	);
  }
  