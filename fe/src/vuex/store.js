/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-23 16:59:51
 * @version $Id$
 */

 import Vue from 'vue'
 import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

 Vue.use(Vuex)

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})