export enum AgeRange {
  teenager = 'teenager',
  college = 'college',
  youth = 'youth',
  middleAge = 'middleAge',
  elder = 'elder'
}

export const ageRangeToText = (ageRange: AgeRange) => {
	switch (ageRange) {
		case AgeRange.teenager:
			return '(青少年)'
		case AgeRange.college:
			return '(大專)'
		case AgeRange.youth:
			return '(青職)'
		case AgeRange.middleAge:
			return '(壯年)'
		case AgeRange.elder:
			return '(年長)'
		default:
			return ''
	}
}