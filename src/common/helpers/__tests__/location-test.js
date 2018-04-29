import location from '../location';

describe('Location', () => {
  describe('getLocationType', () => {
    it('should find british location type', () => {
      const type = location.getLocationType('SV80');
      expect(type).to.eql('british');
    });

    it('should find irish location type', () => {
      const type = location.getLocationType('N76430032');
      expect(type).to.eql('irish');
    });

    it('should find latlon location type', () => {
      const type = location.getLocationType('52.2N 1.2314W');
      expect(type).to.eql('latlon');
    });

    it('should find channel location type', () => {
      const type = location.getLocationType('WV3879');
      expect(type).to.eql('channel');
    });
  });
});
