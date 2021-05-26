import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  url: '',
  imageResults: {
    downloadedImages: [],
    failedImages: [],
    message: null,
    found: 0
  },
  styleResults: {
    colors: [],
    styles: {}
  },
  error: null,
  loading: null,
  zipCount: 0,
  zipped: 0,
  working: false,
  actionQue: [],
  socketUser: '',
  socketRoom: ''
})
