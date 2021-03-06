function getLeekOpponents(leekId, callback) {
    $.getJSON('/api/garden/get-leek-opponents/' + leekId + '/$').done(callback);
}
function startSoloFight(leekId, targetId, callback) {
    $.post('/api/garden/start-solo-fight', {leek_id: leekId, target_id: targetId, token: '$'}, 'json').done(callback);
}
function autoFight(leekId) {
    getLeekOpponents(leekId, function(data) {
        var opponent = data.opponents[0];
        for (var o of data.opponents) {
            if (o.talent > opponent.talent) opponent = o;
        }
        startSoloFight(leekId, opponent.id, function(data) {
            console.log(data);
        });
    });
}
function multipleAutoFight(leekId, n, delay) {
    autoFight(leekId);
    if (n <= 1) return;
    setTimeout(
        function() {
            multipleAutoFight(leekId, n - 1, delay);
        },
        delay
    );
}
