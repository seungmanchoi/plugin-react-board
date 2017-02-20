import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { timeAgo } from '../../utils';
import Spinner from './../Spinner';

class DetailView extends Component {

	static propTypes = {
		view: PropTypes.object
	}

	static contextTypes = {
		router: PropTypes.object
	}

	tmpId;

	constructor(props, context) {
		super(props);

		this.fetch = ::this.fetch;
		this.deleteBoard = ::this.deleteBoard;
	}

	componentWillMount() {
		this.fetch();
	}

	componentWillUpdate() {
		const id = this.context.router.params.id;
		const pathname = this.context.router.location.pathname;

		//delete 요청후 fetch하는 이슈로 pathname으로 확인
		if(this.tmpId !== id && pathname !== "/") {
			this.fetch();
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.view.deleted) {
			this.context.router.push('/');
		}
	}

	fetch() {
		const id = this.context.router.params.id;
		this.tmpId = id;
		this.props.fetchDetailView(id);

		document.body.scrollTop = 0;
	}

	deleteBoard(e) {
		e.preventDefault();

		const id = this.context.router.params.id;

		if(confirm("삭제하시겠습니까?")) {
			this.props.deleteBoard(id);
		}
	}

	render() {

		if(this.props.view.error) {
			XE.toast('', this.props.view.error.message);
		}

		if(this.props.view.loading) {
			return (
				<Spinner />
			)
		}

		const item = this.props.view.item;
		const id = this.context.router.params.id;

		const categories = this.props.view.categories;
		const category = item.category;
		const categoryName = category? _.find(categories, o => ( o.value == category.itemId )).text : '없음';

		return (
			<div className="board_read">
				<div className="read_header">
					<span className="category">{categoryName}</span>
					<h1><a href="#">{item.title}</a></h1>
					<div className="more_info">
						<a href="#" className="mb_autohr">{item.writer}</a>
						<span className="mb_time"><i className="xi-time"></i> {timeAgo(item.createdAt)}</span>
						<span className="mb_readnum"><i className="xi-eye"></i> {item.readCount}</span>
					</div>
				</div>
				<div className="read_body">
					<div className="xe_content">
						<div className="__xe_contents_compiler" id="xe-editor-content" dangerouslySetInnerHTML={{__html: item.content}}></div>
					</div>
				</div>

				<div className="read_footer">
					<div className="bd_function">
						<div className="bd_function_r">
							<Link to={`/edit/${id}`} className="bd_ico bd_modify"><i className="xi-eraser"></i><span className="xe-sr-only">수정</span></Link>
							<a href="#" className="bd_ico bd_delete" onClick={this.deleteBoard}><i className="xi-trash"></i><span className="xe-sr-only">삭제</span></a>
							<div className="bd_more_area">
								<a href="#" className="bd_ico bd_more_view"><i className="xi-ellipsis-h"></i><span className="xe-sr-only">더보기</span></a>
								<div className="ly_popup">
									<ul>
										<li><a href="#">신고</a></li>
										<li><a href="#">스패머관리</a></li>
										<li><a href="#">휴지통</a></li>
										<li><a href="#">등등</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div className="bd_like_more">
							<ul>
								<li><img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRTEyUfPSIFSp5Vt75bhjqmF8pO26z7S8Nwv96S8QROx6j7RGzJ-efZ" alt="" title="" /></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DetailView;