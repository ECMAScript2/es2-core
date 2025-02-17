goog.provide( 'core.dateToJSON' );

/**
 * @param {!Date} date 
 * @return {string} */
core.dateToJSON = function( date ){
    function toXX( n ){
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    };
    function toXXX( n ){
        n = '00' + n;
        return n.substr( n.length - 3 );
    };
    function toXXXX( n ){
        n = '000' + n;
        return n.substr( n.length - 4 );
    };
    function toXXXXXX( n ){
        n = '00000' + n;
        return n.substr( n.length - 6 );
    };

    var year = date.getUTCFullYear();

    return (
            year <= 0
                ? '-' + toXXXXXX( - year )
          : 1e4 <= year
                ? '+' + toXXXXXX( year )
                : toXXXX( year )
        ) + '-' +
        toXX( date.getUTCMonth() + 1 ) + '-' +
        toXX( date.getUTCDate()      ) + 'T' +
        toXX( date.getUTCHours()     ) + ':' +
        toXX( date.getUTCMinutes()   ) + ':' +
        toXX( date.getUTCSeconds()   ) + '.' +
        toXXX( date.getUTCMilliseconds() ) + 'Z';
};
