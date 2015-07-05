import K from 'kefir';
import hg from 'mercury';

export function toObservable (prop, initial_value) {
    const obs = hg.value(initial_value);
    prop.onValue(value => obs.set(value));
    return obs;
}

export function makeObservable (predicate) {
    const prop = K.fromEvents(window, 'resize')
        .throttle(100)
        .map(predicate)
        .toProperty(predicate)
        .skipDuplicates();

    return toObservable(prop);
}
