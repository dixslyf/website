import { useStore } from "@nanostores/vue";
import type { Store, StoreValue } from "nanostores";
import { onMounted, readonly, ref, watch, type DeepReadonly, type Ref } from "vue";

export function useLazyStore<S extends Store, V extends StoreValue<S>>(
  store: S,
): DeepReadonly<Ref<V | undefined>>;
export function useLazyStore<S extends Store, V extends StoreValue<S>>(
  store: S,
  initialValue: V,
): DeepReadonly<Ref<V>>;
export function useLazyStore<S extends Store, V extends StoreValue<S>>(
  store: S,
  initialValue?: V,
): DeepReadonly<Ref<V | undefined>> {
  const r = ref(initialValue);

  const $store = useStore(store);
  onMounted(() => {
    r.value = $store.value;
    watch($store, (v) => (r.value = v));
  });

  return readonly(r);
}
