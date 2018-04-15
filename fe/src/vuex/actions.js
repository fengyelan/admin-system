/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-23 17:05:18
 * @version $Id$
 */
const actions = {
	setUserListCurPageNum({commit},num){
		commit('set_user_list_cur_page_num',num);
	},
	getCurUserList({commit},res){
		commit('get_cur_user_list',res);
	},
	setGoodListCurPageNum({commit},num){
		console.log(num);
		commit('set_good_list_cur_page_num',num);
	},
	getCurGoodList({commit},res){
		console.log(res);
		commit('get_cur_good_list',res);
	},

}

export default actions;
