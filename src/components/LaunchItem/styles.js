import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: '#90abd9',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  description: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#01042b',
    flexWrap: 'wrap',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 10,
    color: '#333',
    marginRight: 10,
  },
  status: {
    fontSize: 12,
    color: '#333',
  },
  subContainer: {
    flexDirection: 'row',
    width: '100%',
  }
});