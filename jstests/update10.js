
t = db.update10;
t.drop();

function s(){
    return t.find().sort( { _id : 1 } ).map( function(z){ return z.x; } );
}

getLastError = function() {
    ret = db.runCommand( { getlasterror : 1 } );
//    printjson( ret );
    return ret;
}

t.save( { _id : 1 , x : 1 } );
t.save( { _id : 2 , x : 5 } );

t.update( { x : 1 } , { $noop : null } , true , false );
assert.eq( "1,5" , s() , "A" );

t.update( { x : 7 } , { $noop : null } , true , false );
assert.eq( "1,5,7" , s() , "B" );

t.update( { x : 7 } , { $noop : null } , true , false );
assert.eq( "1,5,7" , s() , "C" );

t.update( { x : 7 } , { $noop : 1 } , true , false );
assert.eq( 1 , getLastError().n , "D" );
