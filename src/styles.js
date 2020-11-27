import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
            textAlign: 'center'
        },
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    productCard: {
        maxWidth: 'auto'
    },
    card: {
        background: '#F5F5F5',
        boxShadow: 'none',
    },
    container: {
        background: '#F5F5F5',
    },
    right: {
        textAlign: 'right',
        marginRight: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(3),
        width: '100%',
    },
    error: {
        color: 'red',
    },
    productItem: {
        marginRight: theme.spacing(1),
    },
    noItem: {
        marginBottom: theme.spacing(2),
    },
    processNowBtn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
        backgroundColor: '#0078C0',
        color: 'white'
    },
    formControl: {
        width: '100%',
    },
    iconGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        background: 'red',
        borderRadius: '50%',
        color: 'white',
    },
}));

export {
    useStyles
}