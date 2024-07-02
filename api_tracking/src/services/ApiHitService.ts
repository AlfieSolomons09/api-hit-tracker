import client from "../config/database";

interface ApiHit {
    timestamp: Date;
    requestType: string;
    endpoint: string;
    userAgent: string;
    requestBody: string | null;
    operatingSystem: string;
    ipAddress: string;
  }
  
  export const logApiHit = async (hit: ApiHit) => {
    const query = `
      INSERT INTO api_hits (timestamp, request_type, endpoint, user_agent, request_body, operating_system, ip_address)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      hit.timestamp,
      hit.requestType,
      hit.endpoint,
      hit.userAgent,
      hit.requestBody,
      hit.operatingSystem,
      hit.ipAddress,
    ];
  
    try {
      await client.query(query, values);
    } catch (error) {
      console.error('Error logging API hit:', error);
      throw error;
    }
  };
  
  export const getApiHits = async () => {
    const query = 'SELECT * FROM api_hits';
  
    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching API hits:', error);
      throw error;
    }
  };

  export const getRequestCountByOS = async () => {
    const query = `
      SELECT operating_system, COUNT(*) AS count
      FROM api_hits
      GROUP BY operating_system
    `;
  
    try {
      const result = await client.query(query);
      return result.rows.map(row => ({
        name: row.operating_system,
        value: parseInt(row.count, 10),
      }));
    } catch (error) {
      console.error('Error fetching request count by OS:', error);
      throw error;
    }
  };

  export const getRequestCountByCriteria = async (criteria: string) => {
    let query = '';
    
    switch (criteria) {
      case 'status':
        query = `
          SELECT request_status, COUNT(*) AS count
          FROM api_hits
          GROUP BY request_status
        `;
        break;
      case 'duration':
        query = `
          SELECT duration, COUNT(*) AS count
          FROM api_hits
          GROUP BY duration
        `;
        break;
      case 'ip_address':
        query = `
          SELECT ip_address, COUNT(*) AS count
          FROM api_hits
          GROUP BY ip_address
        `;
        break;
      default:
        throw new Error('Invalid criteria');
    }
  
    try {
      const result = await client.query(query);
      return result.rows.map(row => ({
        name: row[criteria],
        value: parseInt(row.count, 10),
      }));
    } catch (error) {
      console.error(`Error fetching request count by ${criteria}:`, error);
      throw error;
    }
  };
  