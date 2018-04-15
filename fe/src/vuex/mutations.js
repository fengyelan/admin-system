/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-23 17:05:46
 * @version $Id$
 */

const mutations = {
	set_user_list_cur_page_num:(state,num) => {
		state.userList.curPageNum = num;
	},
	get_cur_user_list:(state,res) => {
		state.userList.list = res.list;
		state.userList.count = res.count;
	},
	set_good_list_cur_page_num(state,num){
		state.goodList.curPageNum = num;
	},
	get_cur_good_list(state,res){
		state.goodList.list = res.list;
		state.goodList.count = res.count;
	}

}

export default mutations