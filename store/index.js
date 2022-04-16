/* eslint-disable no-console */
import { collection, getDocs, addDoc, deleteDoc, doc , updateDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebaseConfig';

const dbTask = collection(db, "taskTodo")
export const state = () => ({
  taskTodos: [],
  onEvent: false,
})

export const actions = {
  async getTasks({commit}) {
    const taskData = [];
    try {
      const querySnapshot = await getDocs(dbTask);

      querySnapshot.forEach((doc) => {
        const taskId = doc.data();
        taskId.id = doc.id;
        taskData.push(taskId);
      })
      commit('SETDATA_PAGING', taskData)
    } catch (error) {
      console.log(error);
    }
  },
  async setTask ({commit},payload) {
    const date = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)
    try {
      const taskDocRef = await addDoc(dbTask, {
        name: payload.name,
        content: payload.content,
        deadline: payload.deadline,
        createdAt: date, 
      });
      this.$router.push({path:'task' + '/detail?id=' + taskDocRef.id})
    } catch (error) {
      console.log(error)
    }
  },
  async updateTask ({commit},payload) {
    const docRef = doc(db, "taskTodo", payload.id);
    try {
      await updateDoc(docRef, {
        name: payload.name,
        content: payload.content,
        deadline: payload.deadline
      })
      this.$router.go({path:'task' + '/detail?id=' + docRef.id})
    } catch (error) {
      console.log(error)
    }
  },
  async deleteTask ({commit}, payload) {
    try {
      await deleteDoc(doc(db, "taskTodo", payload.id))
    } catch (error) {
      console.log(error)
    }
  },
  handleClickEditTask ({commit}, payload) {
    // eslint-disable-next-line prefer-const
    let onClickEditTask = payload;
    console.log(onClickEditTask)
    commit('HANDLE_CLICK_EDIT_TASK', onClickEditTask)
  }
}

export const mutations = {
  SETDATA_PAGING (state, payload) {
    state.taskTodos = payload;
  },
  HANDLE_CLICK_EDIT_TASK (state, payload) {
    state.onEvent = payload;
  }
}