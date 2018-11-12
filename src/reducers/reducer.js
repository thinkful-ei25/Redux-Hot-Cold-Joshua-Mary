import { GENERATE_AURAL_UPDATE, RESTART_GAME, MAKE_GUESS } from '../actions/actions';
import { bindActionCreators } from 'redux';



const initialState = {
    guesses: [],
    feedback: 'Make your guess!',
    auralStatus: '',
    correctAnswer: Math.floor(Math.random() * 100) + 1
};

export default (state = initialState, action) => {
    if (action.type === GENERATE_AURAL_UPDATE) {
        const { guesses, feedback } = state;
        const pluralize = guesses.length !== 1;

        let auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

        if (guesses.length > 0) {
            auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
        }
        return {
            ...state,
            auralStatus
        }
    }
    if (action.type === RESTART_GAME) {
        return { ...initialState };
    } 
    if (action.type === MAKE_GUESS) {
        let guess = parseInt(guess, 10);
        let feedback;
        if (isNaN(guess)) {
            feedback = 'Please enter a valid number';
            return {
                ...state,
                feedback
            }

        }
        const difference = Math.abs(guess - this.state.correctAnswer);
        if (difference >= 50) {
            feedback = 'You\'re Ice Cold...';
        } else if (difference >= 30) {
            feedback = 'You\'re Cold...';
        } else if (difference >= 10) {
            feedback = 'You\'re Warm.';
        } else if (difference >= 1) {
            feedback = 'You\'re Hot!';
        } else {
            feedback = 'You got it!';
        }


        return {
            ...state,
            feedback,
            guesses: [...state.guesses, guess]
        }
    }
    return state;
}
