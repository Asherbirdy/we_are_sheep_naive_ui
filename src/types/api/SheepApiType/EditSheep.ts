// * Edit Sheep
export interface EditSheepPayload {
  sheepId: string
  data: {
    ageRange: string
    weekInviteTag: string[]
    identity: string
    focusPerson: string
    personStatus: string
    note: string
  }
}