export enum PersonListKey {
  personStatus = 'personStatus',
  _id = '_id',
  name = 'name',
	weekInviteTag = 'weekInviteTag',
  ageRange = 'ageRange',
	identity = 'identity',
  focusPerson = 'focusPerson',
  userId = 'userId',
  note = 'note',
}

export enum AgeRange {
  teenager = 'teenager',
  college = 'college',
  youth = 'youth',
  middleAge = 'middleAge',
  elder = 'elder'
}

export enum Identity {
	'Male' = 'M',
	'Female' = 'F',
	'Brother' = 'B',
	'Sister' = 'S'
}

export const identityOptions = [
	{ label: '男(福音朋友)', value: Identity.Male },
	{ label: '女(福音朋友)', value: Identity.Female },
	{ label: '弟兄', value: Identity.Brother },
	{ label: '姊妹', value: Identity.Sister }
]

export const ageRangeToText = (ageRange: AgeRange) => {
	switch (ageRange) {
		case AgeRange.teenager:
			return '青少年'
		case AgeRange.college:
			return '大專'
		case AgeRange.youth:
			return '青職'
		case AgeRange.middleAge:
			return '壯年'
		case AgeRange.elder:
			return '年長'
		default:
			return ''
	}
}

export const ageRangeOptions = Object.values(AgeRange).map(ageRange => ({
	label: ageRangeToText(ageRange),
	value: ageRange
}))

export const focusOptions = [
	{
		label: '重點牧養',
		value: 'isFocus'
	},
	{
		label: '其他名單',
		value: 'notFocus'
	}
]

export const statusOptions = [
	{
		label: '無設定',
		value: 'none'
	},
	{
		label: '正常聚會',
		value: 'normal'
	},
	{
		label: '久未聚會',
		value: 'longTimeNoSee'
	},
	{
		label: '福音朋友',
		value: 'gospelfriend'
	}
]

export const tagsOptions = [
	{
		label: '已邀主日',
		value: '已邀主日'
	},
	{
		label: '已邀家聚會',
		value: '已邀家聚會'
	},
	{
		label: '已邀加小排',
		value: '已邀加小排'
	}
]