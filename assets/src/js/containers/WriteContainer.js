import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import { fetchBoardIndex, fetchCategory } from './../actions/boardListAction';
import { resetWriteForm, CHANGE_CATEOGRY } from './../actions/boardWriteAction';
import WriteForm from './../components/write/WriteForm';

const form = 'writeForm';
const fields = ['title', 'content', 'slug', 'categoryItemId'];
const formConfig = {
	form,
	fields
};

const mapStateToProps = (state) => {
	return {
		categories: state.list.categories,
		categoryItemId: state.write.categoryItemId,
		item: state.write.item,
		err: state.write.error,
		loading: state.write.loading
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		resetComponent: () => {
			dispatch(resetWriteForm());
		},
		fetchBoardIndex: () => {
			dispatch(fetchBoardIndex());
		},
		fetchCategory: () => {
			dispatch(fetchCategory());
		},
		handleSelect: (categoryItemId) => {
			dispatch(change(form, 'categoryItemId', categoryItemId));
		},
		changeFormField: ({ field, value }) => {
			dispatch(change(form, field, value));
		},
		changeCategory: (categoryItemId) => {
			dispatch({
				type: CHANGE_CATEOGRY,
				categoryItemId
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(WriteForm));