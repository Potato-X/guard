import datasource from './datasource.json';
import systemCardList from './systemcardlist.json';
import requestHttp from './request'
export function getoverallSituation() {
  let source = datasource.overallSituation;
  return requestHttp(source)
}
export function getinvalidAccess() {
  let source = datasource.invalidAccess;
  return requestHttp(source)
}

export function getsystemCardList({ name = "" }) {
  const filtersystemCardList = systemCardList.filter(item => {
    if (name) {
      return item.systemName.includes(name)
    } else {
      return true
    }
  })
  return requestHttp(filtersystemCardList)
}
