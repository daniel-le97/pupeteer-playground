import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  imageResults: {
    downloadedImages: [],
    failedImages: [],
    message: null,
    error: null,
    found: 0
  },
  styleResults: {
    colors: []
  },
  loading: null,
  working: false,
  actionQue: [],
  socketUser: '',
  socketRoom: ''
})
