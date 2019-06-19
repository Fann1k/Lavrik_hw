const smartgrid = require('smart-grid');

smartgrid('./src/precss', {
    columns: 24,
    offset: "10px",
    container: {
        maxWidth: "950px"
    },
    breakPoints: {
        md: {
            width: "992px",
            fields: "15px"
        },
        sm: {
            width: "720px"
        },
        xs: {
            width: "576px",
            fields: "5px"
        },
        xxs: {
            width: "380px"
        }
    }
});

/*
 * mobileFirst
 *  false -> max-width
 *  true -> min-width
 */