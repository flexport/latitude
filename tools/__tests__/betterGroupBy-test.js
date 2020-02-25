/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import betterGroupBy from "../betterGroupBy";

describe("betterGroupBy", () => {
  type BasicElem = {
    id: number,
    key?: string,
  };
  const elem1 = {id: 1, key: "cat1"};
  const elem2 = {id: 2, key: "cat1"};
  const elem3 = {id: 3, key: "cat2"};
  const elemNoKey = {id: 3};
  const validateFn = (groupMap: Map<string, Array<BasicElem>>) => {
    expect(Array.from(groupMap.keys()).length).toBe(2);
    const cat1List = groupMap.get("cat1");
    if (!cat1List) {
      expect(false).toEqual(true);
    } else {
      expect(cat1List.length).toBe(2);
    }
    const cat2List = groupMap.get("cat2");
    if (!cat2List) {
      expect(false).toEqual(true);
    } else {
      expect(cat2List.length).toBe(1);
    }
  };
  it("discards a null key", () => {
    const elems = [elem1, elem2, elem3, elemNoKey];
    const groupMap = betterGroupBy(elems, (elem: BasicElem) => elem.key);
    // $FlowFixMe(uforic)
    validateFn(groupMap);
  });
  it("does a group by", () => {
    const elems = [elem1, elem2, elem3, elemNoKey];
    const groupMap = betterGroupBy(elems, (elem: BasicElem) => elem.key);
    // $FlowFixMe(uforic)
    validateFn(groupMap);
  });
});
