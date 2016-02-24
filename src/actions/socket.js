export const INITIALIZE_APP = 'INITIALIZE_APP';


export function initializeApp(data) {
  return {
    type: INITIALIZE_APP,
    data
  }
}
