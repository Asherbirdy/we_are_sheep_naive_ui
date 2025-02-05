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

export const identityToText = (identity: Identity) => {
	switch (identity) {
		case Identity.Brother:
			return '弟兄'
		case Identity.Sister:
			return '姊妹'
		case Identity.Male:
			return '男福音朋友'
		case Identity.Female:
			return '女福音朋友'
		default:
			return ''
	}
}

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

export enum PersonStatus {
	none = 'none',
	normal = 'normal',
	longTimeNoSee = 'longTimeNoSee',
	gospelfriend = 'gospelfriend'
}

export const personStatusToText = (status: PersonStatus) => {
	switch (status) {
		case PersonStatus.none:
			return '無設定'
		case PersonStatus.normal:
			return '正常聚會'
		case PersonStatus.longTimeNoSee:
			return '久未聚會'
		case PersonStatus.gospelfriend:
			return '福音朋友'
	}
}
export const statusOptions = [
	{
		label: '無設定',
		value: PersonStatus.none
	},
	{
		label: '正常聚會',
		value: PersonStatus.normal
	},
	{
		label: '久未聚會',
		value: PersonStatus.longTimeNoSee
	},
	{
		label: '福音朋友',
		value: PersonStatus.gospelfriend
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