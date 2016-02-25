export default {
	beginner: {
		dimensions: {
      rows: 9,
      cols: 9
    },
    mines: 10,
    level: 'easy',
    flagCount : 0,
    openCount : 0,
    time : 0,
    status : 'playing'
	},
	intermediate: {
		dimensions: {
      rows: 16,
      cols: 16
		},
    mines: 40,
    level: 'normal',
    flagCount : 0,
    openCount : 0,
    time : 0,
    status : 'playing'
	},
	expert: {
		dimensions: {
      rows: 30,
      cols: 30
		},
    mines: 140,
    level: 'hard',
    flagCount : 0,
    openCount : 0,
    time : 0,
    status : 'playing'
	}
};