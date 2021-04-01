import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  pictureResults: {
    downloadedImages: [
      { url: 'https://thiscatdoesnotexist.com' },
      { url: 'https://source.unsplash.com/800x900/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/900x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x900/?animals,cat' },
      { url: 'https://source.unsplash.com/600x1200/?animals,cat' },
      { url: 'https://source.unsplash.com/600x1200/?animals,cat' },
      { url: 'https://source.unsplash.com/500x500/?animals,cat' },
      { url: 'https://source.unsplash.com/1000x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/900x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/550x700/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/900x2000/?animals,cat' },
      { url: 'https://source.unsplash.com/900x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
      { url: 'https://source.unsplash.com/800x800/?animals,cat' }
    ],
    failedPictures: []
  },
  loading: false
})
