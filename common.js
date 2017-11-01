import './common.scss';

// dynamic import
setTimeout(() => {
    import ('./async.js');
}, 500)


console.log('common.js loaded');